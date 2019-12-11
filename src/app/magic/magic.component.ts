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
               private sanitizer: DomSanitizer) { }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    console.log('Insode the magic comp: id: ' + id);

    this.http.getURL(id).subscribe(data => {
      console.log('indie http :  ' + data.response[0].URL);
      this.selectedUrl = data.response[0];
      console.log('Selected URL: ' + this.selectedUrl);
      this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedUrl.URL);
    });
    this.m.addEventListener('mousedown', this.mouseDown, true);
    this.m.addEventListener('mouseup', this.mouseUp, true);
    this.m.addEventListener('mousemove', this.move, true);
  }
  gotoHeroes() {
    this.router.navigate(['/urls']);
  }

  mouseUp() {
    this.isDown = false;
  }

  mouseDown(e) {
    this.isDown = true;
    this.offset.push((this.m.offsetLeft - e.clientX));
    this.offset.push((this.m.offsetTop - e.clientY));
  }

  move(event) {
    event.preventDefault();
    if (this.isDown) {
        this.mousePosition = {

            x : event.clientX,
            y : event.clientY

        };
        this.m.style.left = (this.mousePosition.x + this.offset[0]) + 'px';
        this.m.style.top  = (this.mousePosition.y + this.offset[1]) + 'px';
    }
  }
}
