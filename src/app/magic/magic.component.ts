import { AdalService } from './../API_service/adal.service';
import { URLService } from './../API_service/api.url.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { URL } from '../API_service/models/URL.model';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-magic',
  templateUrl: './magic.component.html',
  styleUrls: ['./magic.component.css']
})
export class MagicComponent implements OnInit {
  selectedUrl: URL;
  trustedURL: SafeUrl;
  m = document.getElementById('move');
  isDown = false;
  offset: number[] = [ 0 , 0 ];
  mousePosition = null;
  constructor( private http: URLService,
               private route: ActivatedRoute,
               private router: Router,
               private sanitizer: DomSanitizer,
               private adalService: AdalService) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    console.log('Insode the magic comp: id: ' + id);

    this.http.getURL(id).subscribe(data => {
      console.log('indie http :  ' + data.response[0].URL);
      this.selectedUrl = data.response[0];
      console.log('Selected URL: ' + this.selectedUrl);
      this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedUrl.URL);
    });

  }
  gotoHeroes() {
    this.router.navigate(['/urls']);
  }
}
