import { ResultModel } from './../API_service/models/Result.model';
import { URLService } from './../API_service/api.url.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { URL } from '../API_service/models/URL.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-magic',
  templateUrl: './magic.component.html',
  styleUrls: ['./magic.component.css']
})
export class MagicComponent implements OnInit {
  selectedUrl: URL;
  constructor( private http: URLService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log('Insode the magic comp: id: ' + id);

    this.http.getURL(id).subscribe(data => {
      console.log('indie http :  ' + data.response[0].Url_Name);
      this.selectedUrl = data.response[0];
      console.log('Selected URL: ' + this.selectedUrl);
    });
  }
  gotoHeroes() {
    this.router.navigate(['/urls']);
  }

}
