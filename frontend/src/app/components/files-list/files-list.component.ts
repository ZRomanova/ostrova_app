import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  files = []
  openId: number = null

  @ViewChild('file') fileInput: ElementRef

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.fetch('data').subscribe(result => {
      this.files = result
    }, error => console.log(error))
  }

  setOpenId(id) {
    if (this.openId == id) this.openId = null
    else this.openId = id
  }

  download(id, type) {
    this.httpService.fetchById('downloads', id, {type}).subscribe(res => {
    })
  }

  toggleFile() {
    this.fileInput.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    const name = file.name

    this.httpService.upload(file, {name}).subscribe(res => {
      this.files.unshift(res)
      console.log(res)
    }, error => {console.log(error)})
    
  }
}
