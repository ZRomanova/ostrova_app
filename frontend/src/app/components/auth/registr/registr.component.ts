import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-registr',
  templateUrl: './registr.component.html',
  styleUrls: ['./registr.component.css']
})
export class RegistrComponent implements OnInit {

  form: FormGroup
  isValidFeedback = true
  feedback = ''

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit() {
    this.form.disable()
    this.httpService.create('auth/registr', this.form.value).subscribe(
      res => {
        this.isValidFeedback = true
        this.feedback = res.message
      },
      error => {
        // location.href = environment.url
        console.log(error.error.message)
        this.isValidFeedback = false
        this.feedback = error.error.message
        this.form.enable()
      }
    )
  }

}
