原理：添加`BOM`头
```js
let blob = this.response
      const name = xhr.getResponseHeader('content-disposition').split(';')[1].split('filename=')[1]
      if (type === 'csv') {
        blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), blob], {
          type: 'text/csv;charset=utf-8',
        })
      }
      const reader = new FileReader()
      reader.readAsDataURL(blob) // 转换为base64，可以直接放入a标签href
      reader.onload = function (e) {
        // 转换完成，创建一个 a 标签用于下载
        const a = document.createElement('a')
        a.download = name // 自定义下载文件名称
        a.href = e.target.result
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
```