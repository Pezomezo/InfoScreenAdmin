import { MagicSettings } from './../API_service/models/MagicSettings.model';
import { MagicService } from './../API_service/api.magic.service';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL } from '../API_service/models/URL.model';

@Component({
  selector: 'app-magic',
  templateUrl: './magic.component.html',
  styleUrls: ['./magic.component.css']
})
export class MagicComponent implements OnInit {
  @Input() selectedURL: URL;
  magic: MagicSettings;
  constructor( private http: MagicService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Inside the magic Component');
    const id = +this.route.snapshot.paramMap.get('id');
    this.http.getMagic(id).subscribe(magic => {
      this.magic = magic.response[0];
      console.log(this.magic);
    });
  }

}
