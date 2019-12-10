import { URL } from './URL.model';
import { InfoScreenPC } from './InfoScreen.model';


export class GroupListModel
{
  URL: Array<URL> = new Array<URL>();
  GroupName: string;
  InfoScreens: Array<InfoScreenPC> = new Array<InfoScreenPC>();

}
