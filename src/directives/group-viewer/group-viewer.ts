import { Directive, ElementRef, Input } from '@angular/core';

/**
 * Generated class for the GroupViewerDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[groupViewer]' // Attribute selector
})
export class GroupViewerDirective {

  constructor(private element: ElementRef) {

    //console.log('Hello GroupViewerDirective Directive');
  }

  @Input()
  set groupViewer(viewed: boolean){
    setTimeout(() => {
      const nativeElement: HTMLElement = this.element.nativeElement;
      viewed ? nativeElement.style.fontWeight = 'normal' : nativeElement.style.fontWeight = 'bold';
    }, 500);
  }

}
