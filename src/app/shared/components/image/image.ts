import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { ImageVariant } from './models/variants';

@Component({
  selector: 'spx-image',
  standalone: true,
  templateUrl: './image.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Image {
  public src = input.required<string>();
  public alt = input<string>('Image');
  public maxHeight = input<number>(400);
  public variant = input<ImageVariant>(ImageVariant.RELATIVE);

  public hasError = signal(false);

  public ImageVariant = ImageVariant;

  public onError(): void {
    this.hasError.set(true);
  }

  public getClasses() {
    const classes: string[] = [];

    if (this.variant() === ImageVariant.COVER) {
      classes.push('absolute');
      classes.push('inset-0');
      classes.push('w-full');
      classes.push('h-full');
      classes.push('object-cover');
      classes.push('brightness-50');
    } else {
      classes.push('relative');
      classes.push('w-64');
      classes.push('h-64 ');
      classes.push('object-contain');
      classes.push('drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]');
    }

    return classes.join(' ');
  }
}
