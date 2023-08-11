import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service'

@Component({
  selector: 'app-upload-form',
  templateUrl: './upload-form.component.html',
  styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

  name: string = ''
  file: File

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.file = file
    if (!this.name) this.name = this.file.name
  }

  onSubmit() {
    if (this.file) {
      if (!this.name) this.name = this.file.name

      this.httpService.upload(this.file, {name: this.name}).subscribe(res => {
      }, error => {console.log(error)})
    }
  }

}
