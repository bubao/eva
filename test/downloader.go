package downloader

import (
	"fmt"
	"io"
	"log"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"

	"github.com/cheggaaa/pb"
	"github.com/fatih/color"

	"github.com/iawia002/annie/config"
	"github.com/iawia002/annie/request"
	"github.com/iawia002/annie/utils"
)

// URLData data struct of single URL
type URLData struct {
	URL  string
	Size int64
	Ext  string
}

// VideoData data struct of video info
type VideoData struct {
	Site  string
	Title string
	// [URLData: {URL, Size, Ext}, ...]
	// Some video files have multiple fragments
	// and support for downloading multiple image files at once
	URLs    []URLData
	Size    int64
	Type    string
	Quality string
}

func (data VideoData) printInfo() {
	cyan := color.New(color.FgCyan)
	fmt.Println()
	cyan.Printf("   Site:   ")
	fmt.Println(data.Site)
	cyan.Printf("  Title:   ")
	fmt.Println(data.Title)
	cyan.Printf("   Type:   ")
	fmt.Println(data.Type)
	if data.Quality != "" {
		cyan.Printf("Quality:   ")
		fmt.Println(data.Quality)
	}
	cyan.Printf("   Size:   ")
	fmt.Printf("%.2f MiB (%d Bytes)\n", float64(data.Size)/(1024*1024), data.Size)
	fmt.Println()
}

func (data *VideoData) calculateTotalSize() {
	var size int64
	for _, urlData := range data.URLs {
		size += urlData.Size
	}
	data.Size = size
}

// urlSave save url file
func (data VideoData) urlSave(
	urlData URLData, refer, fileName string, bar *pb.ProgressBar,
) {
	filePath := utils.FilePath(fileName, urlData.Ext, false)
	fileSize := utils.FileSize(filePath)
	// TODO: Live video URLs will not return the size
	if fileSize == urlData.Size {
		fmt.Printf("%s: file already exists, skipping\n", filePath)
		bar.Add64(fileSize)
		return
	}
	tempFilePath := filePath + ".download"
	tempFileSize := utils.FileSize(tempFilePath)
	headers := map[string]string{
		"Referer": refer,
	}
	var file *os.File
	if tempFileSize > 0 {
		// range start from zero
		headers["Range"] = fmt.Sprintf("bytes=%d-", tempFileSize)
		file, _ = os.OpenFile(tempFilePath, os.O_APPEND|os.O_WRONLY, 0644)
		bar.Add64(tempFileSize)
	} else {
		file, _ = os.Create(tempFilePath)
	}

	// close and rename temp file at the end of this function
	// must be done here to avoid the following request error to cause the file can't close properly
	defer func() {
		file.Close()
		// must close the file before rename or it will cause `The process cannot access the file because it is being used by another process.` error.
		err := os.Rename(tempFilePath, filePath)
		if err != nil {
			log.Fatal(err)
		}
	}()

	res := request.Request("GET", urlData.URL, nil, headers)
	if res.StatusCode >= 400 {
		red := color.New(color.FgRed)
		log.Print(urlData.URL)
		log.Fatal(red.Sprintf("HTTP error: %d", res.StatusCode))
	}
	defer res.Body.Close()
	writer := io.MultiWriter(file, bar)
	// Note that io.Copy reads 32kb(maximum) from input and writes them to output, then repeats.
	// So don't worry about memory.
	_, copyErr := io.Copy(writer, res.Body)
	if copyErr != nil {
		log.Fatal(fmt.Sprintf("Error while downloading: %s, %s", urlData.URL, copyErr))
	}
}

// Download download urls
func (data VideoData) Download(refer string) {
	if data.Size == 0 {
		data.calculateTotalSize()
	}
	data.printInfo()
	if config.InfoOnly {
		return
	}
	bar := pb.New64(data.Size).SetUnits(pb.U_BYTES).SetRefreshRate(time.Millisecond * 10)
	bar.ShowSpeed = true
	bar.ShowFinalTime = true
	bar.SetMaxWidth(1000)
	bar.Start()
	if len(data.URLs) == 1 {
		// only one fragment
		data.urlSave(data.URLs[0], refer, data.Title, bar)
		bar.Finish()
	} else {
		var wg sync.WaitGroup
		// multiple fragments
		parts := []string{}
		for index, url := range data.URLs {
			partFileName := fmt.Sprintf("%s[%d]", data.Title, index)
			partFilePath := utils.FilePath(partFileName, url.Ext, false)
			parts = append(parts, partFilePath)
			if strings.Contains(refer, "mgtv") {
				// Too many threads cause mgtv to return HTTP 403 error
				data.urlSave(url, refer, partFileName, bar)
			} else {
				wg.Add(1)
				go func(url URLData, refer, fileName string, bar *pb.ProgressBar) {
					defer wg.Done()
					data.urlSave(url, refer, fileName, bar)
				}(url, refer, partFileName, bar)
			}
		}
		wg.Wait()
		bar.Finish()

		if data.Type != "video" {
			return
		}
		// merge
		// write ffmpeg input file list
		mergeFile := data.Title + "-merge.txt"
		file, _ := os.Create(mergeFile)
		for _, part := range parts {
			file.Write([]byte(fmt.Sprintf("file '%s'\n", part)))
		}

		filePath := utils.FilePath(data.Title, "mp4", false)
		fmt.Printf("Merging video parts into %s\n", filePath)
		cmd := exec.Command(
			"ffmpeg", "-y", "-f", "concat", "-safe", "-1",
			"-i", mergeFile, "-c", "copy", "-bsf:a", "aac_adtstoasc", filePath,
		)
		err := cmd.Run()
		if err != nil {
			log.Fatal(err)
		}
		// remove parts
		os.Remove(mergeFile)
		for _, part := range parts {
			os.Remove(part)
		}
	}
}