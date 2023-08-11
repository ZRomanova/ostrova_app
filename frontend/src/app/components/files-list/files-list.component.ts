import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit {

  files = []
  openId: number = null

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

}
