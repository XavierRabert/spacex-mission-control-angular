import { Directive, Input, ElementRef, Renderer2, OnInit, input, inject } from '@angular/core';
import { BorderSize, CornerStyle } from './models/tech.border';

@Directive({
  selector: '[spxTechBorder]',
  standalone: true,
})
export class TechBorderDirective implements OnInit {
  private _el = inject(ElementRef<HTMLElement>);
  private _renderer = inject(Renderer2);

  public corners = input<CornerStyle>(CornerStyle.TOP_RIGHT);
  public borderSize = input<BorderSize>('md');
  public showDecorations = input<boolean>(false);
  public hoverable = input<boolean>(false);

  private _clipPaths = {
    [CornerStyle.TOP_RIGHT]: (size: number) =>
      `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, 0 100%)`,
    [CornerStyle.ALL]: (size: number) =>
      `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, ${size}px 100%, 0 calc(100% - ${size}px))`,
    [CornerStyle.TOP_BOTTOM]: (size: number) =>
      `polygon(0 0, calc(100% - ${size}px) 0, 100% ${size}px, 100% 100%, ${size}px 100%, 0 calc(100% - ${size}px))`,
    [CornerStyle.NONE]: () => 'none',
  };

  private _sizes = {
    sm: 8,
    xs: 12,
    md: 15,
    lg: 25,
  };

  public ngOnInit() {
    const element = this._el.nativeElement as HTMLElement;
    const size = this._sizes[this.borderSize()];

    const clipPath = this._clipPaths[this.corners()](size);
    this._renderer.setStyle(element, 'clip-path', clipPath);

    this._renderer.addClass(element, 'relative');

    const hasCustomBorder = element.classList.contains('border');
    if (!hasCustomBorder) {
      this._renderer.addClass(element, 'border');
      this._renderer.addClass(element, 'border-cyan-400/30');
    }

    const classList = Array.from(element.classList);
    const hasCustomBackground = classList.some((cls) => cls.startsWith('bg-'));

    if (!hasCustomBackground) {
      this._renderer.addClass(element, 'bg-zinc-950/80');
    }

    if (this.hoverable()) {
      this._renderer.addClass(element, 'transition-all');
      if (!hasCustomBorder) {
        this._renderer.addClass(element, 'hover:border-cyan-400/60');
      }
    }

    if (this.showDecorations()) {
      this._addCornerDecorations(element, size);
    }
  }

  private _addCornerDecorations(element: HTMLElement, size: number) {
    const decorSize = size + 10;

    if (this.corners() === CornerStyle.TOP_RIGHT || this.corners() === CornerStyle.ALL) {
      const topRight = this._renderer.createElement('div');
      this._renderer.addClass(topRight, 'absolute');
      this._renderer.addClass(topRight, 'top-0');
      this._renderer.addClass(topRight, 'right-0');
      this._renderer.setStyle(topRight, 'width', `${decorSize}px`);
      this._renderer.setStyle(topRight, 'height', `${decorSize}px`);
      this._renderer.addClass(topRight, 'border-t-2');
      this._renderer.addClass(topRight, 'border-r-2');
      this._renderer.addClass(topRight, 'border-cyan-400/50');
      this._renderer.appendChild(element, topRight);
    }

    if (this.corners() === CornerStyle.ALL) {
      const topLeft = this._renderer.createElement('div');
      this._renderer.addClass(topLeft, 'absolute');
      this._renderer.addClass(topLeft, 'top-0');
      this._renderer.addClass(topLeft, 'left-0');
      this._renderer.setStyle(topLeft, 'width', `${decorSize}px`);
      this._renderer.setStyle(topLeft, 'height', `${decorSize}px`);
      this._renderer.addClass(topLeft, 'border-t-2');
      this._renderer.addClass(topLeft, 'border-l-2');
      this._renderer.addClass(topLeft, 'border-cyan-400/50');
      this._renderer.appendChild(element, topLeft);

      const bottomLeft = this._renderer.createElement('div');
      this._renderer.addClass(bottomLeft, 'absolute');
      this._renderer.addClass(bottomLeft, 'bottom-0');
      this._renderer.addClass(bottomLeft, 'left-0');
      this._renderer.setStyle(bottomLeft, 'width', `${decorSize}px`);
      this._renderer.setStyle(bottomLeft, 'height', `${decorSize}px`);
      this._renderer.addClass(bottomLeft, 'border-b-2');
      this._renderer.addClass(bottomLeft, 'border-l-2');
      this._renderer.addClass(bottomLeft, 'border-cyan-400/50');
      this._renderer.appendChild(element, bottomLeft);

      const bottomRight = this._renderer.createElement('div');
      this._renderer.addClass(bottomRight, 'absolute');
      this._renderer.addClass(bottomRight, 'bottom-0');
      this._renderer.addClass(bottomRight, 'right-0');
      this._renderer.setStyle(bottomRight, 'width', `${decorSize}px`);
      this._renderer.setStyle(bottomRight, 'height', `${decorSize}px`);
      this._renderer.addClass(bottomRight, 'border-b-2');
      this._renderer.addClass(bottomRight, 'border-r-2');
      this._renderer.addClass(bottomRight, 'border-cyan-400/50');
      this._renderer.appendChild(element, bottomRight);
    }
  }
}
