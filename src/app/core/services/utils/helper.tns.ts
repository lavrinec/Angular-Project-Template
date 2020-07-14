import {  RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as app from 'tns-core-modules/application';
import { View } from 'tns-core-modules/ui/page/page';

export class Helper  {
  static onDrawerButtonTap() {
    const a = app.getRootView().getViewById('mobileMenu');
    console.log('blabla: ', a);

    app.getRootView().eachChildView((view: View) => {
      console.log('view: ', view);
      view.eachChildView((viewChikld: View) => {
        console.log('view: ', viewChikld);
        return true;
      });
      return true;
    });
    // const sideDrawer: RadSideDrawer = <RadSideDrawer>app.getRootView());
    // console.log('aaaa', sideDrawer);
    // sideDrawer.showDrawer();
  }
}
