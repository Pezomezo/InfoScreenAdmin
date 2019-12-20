import { URLService } from '../API_service/services/api.url.service';
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
  GroupID: string;
  DashboardID: string;
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
      // this.trustedURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.selectedUrl.URL);
      // tslint:disable-next-line: max-line-length
      this.extractGroupAndReportID('https://app.powerbi.com/groups/34a31c1c-d876-4208-8d78-c3f7b1407f9f/dashboards/36f4d1ed-3c6a-4a47-bb45-be75e276be6e');
    });

    this.makeResizableDiv('.resizable');
  }
// https://app.powerbi.com/groups/34a31c1c-d876-4208-8d78-c3f7b1407f9f/dashboards/36f4d1ed-3c6a-4a47-bb45-be75e276be6e
  extractGroupAndReportID(url) {
    const keywords: [] = url.split('/');
    keywords.forEach(value => {
      console.log(value);
    });
  }

  back() {
    this.router.navigate(['/urls']);
  }


/*Make resizable div by Hung Nguyen*/
makeResizableDiv(div) {
  const element = document.querySelector(div);
  const resizers = document.querySelectorAll(div + ' .resizer');
  const minimum_size = 20;
  let original_width = 0;
  let original_height = 0;
  let original_x = 0;
  let original_y = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;
  for (let i = 0; i < resizers.length; i++) {
    const currentResizer = resizers[i];
    currentResizer.addEventListener('mousedown', manage);

    function manage(e) {
      e.preventDefault();
      original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
      original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
      original_x = element.getBoundingClientRect().left;
      original_y = element.getBoundingClientRect().top;
      original_mouse_x = e.pageX;
      original_mouse_y = e.pageY;
      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    }

    function resize(e) {
      if (currentResizer.classList.contains('bottom-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height + (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
      } else if (currentResizer.classList.contains('bottom-left')) {
        const height = original_height + (e.pageY - original_mouse_y);
        const width = original_width - (e.pageX - original_mouse_x);
        if (height > minimum_size) {
          element.style.height = height + 'px';
        }
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
        }
      } else if (currentResizer.classList.contains('top-right')) {
        const width = original_width + (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
        }
      } else {
        const width = original_width - (e.pageX - original_mouse_x);
        const height = original_height - (e.pageY - original_mouse_y);
        if (width > minimum_size) {
          element.style.width = width + 'px';
          element.style.left = original_x + (e.pageX - original_mouse_x) + 'px';
        }
        if (height > minimum_size) {
          element.style.height = height + 'px';
          element.style.top = original_y + (e.pageY - original_mouse_y) + 'px';
        }
      }
    }

    function stopResize() {
      window.removeEventListener('mousemove', resize);
    }
  }
}



}
