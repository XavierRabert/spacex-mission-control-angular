import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, input, inject } from '@angular/core';
import { BorderSize, CornerStyle } from './models/types';
import gsap from 'gsap';
import { CLIP_PATHS, CORNER_DECORATIONS, SIZES } from './models/constants';

@Directive({
  selector: '[spxTechBorder]',
  standalone: true,
})
export class TechBorderDirective implements OnInit, OnDestroy {
  private _el = inject(ElementRef<HTMLElement>);
  private _renderer = inject(Renderer2);

  public corners = input<CornerStyle>(CornerStyle.TOP_RIGHT);
  public borderSize = input<BorderSize>('md');
  public showDecorations = input<boolean>(false);
  public borderDecorationsColor = input<string>('border-cyan-400/30');
  public hoverable = input<boolean>(false);

  private _decorations: HTMLElement[] = [];
  private _mouseEnterHandler?: () => void;
  private _mouseLeaveHandler?: () => void;

  public ngOnInit() {
    const el = this._el.nativeElement;
    const size = SIZES[this.borderSize()];

    this._renderer.setStyle(el, 'clip-path', CLIP_PATHS[this.corners()](size));
    this._renderer.addClass(el, 'relative');

    if (!el.classList.contains('border')) {
      this._renderer.addClass(el, 'border');
      this._renderer.addClass(el, this.borderDecorationsColor());
    }

    if (![...el.classList].some((c) => c.startsWith('bg-'))) {
      this._renderer.addClass(el, 'bg-zinc-950/80');
    }

    if (this.showDecorations()) this._addCornerDecorations(el, size);
    if (this.hoverable()) this._setupHoverAnimation(el, size);
  }

  public ngOnDestroy() {
    const el = this._el.nativeElement;
    if (this._mouseEnterHandler) el.removeEventListener('mouseenter', this._mouseEnterHandler);
    if (this._mouseLeaveHandler) el.removeEventListener('mouseleave', this._mouseLeaveHandler);
    gsap.killTweensOf(this._decorations);
  }

  private _addCornerDecorations(element: HTMLElement, size: number) {
    const configs = CORNER_DECORATIONS[this.corners()] ?? [];
    this._decorations = configs.map(({ positions, borders }) =>
      this._createDecoration(element, positions, borders, size + 10),
    );
  }

  private _createDecoration(
    element: HTMLElement,
    positions: string[],
    borders: string[],
    size: number,
  ): HTMLElement {
    const div = this._renderer.createElement('div');
    [...['absolute'], ...positions, ...borders, this.borderDecorationsColor()].forEach((cls) =>
      this._renderer.addClass(div, cls),
    );
    this._renderer.setStyle(div, 'width', `${size}px`);
    this._renderer.setStyle(div, 'height', `${size}px`);
    this._renderer.setStyle(div, 'opacity', '0.5');
    this._renderer.appendChild(element, div);
    return div;
  }

  private _setupHoverAnimation(element: HTMLElement, size: number) {
    const baseSize = size + 10;
    const hoverSize = size * 4;

    this._mouseEnterHandler = () =>
      gsap.to(this._decorations, {
        width: hoverSize,
        height: hoverSize,
        opacity: 1,
        borderColor: 'rgba(34, 211, 238, 1)',
        duration: 0.3,
        ease: 'power2.out',
        stagger: 0.05,
      });

    this._mouseLeaveHandler = () =>
      gsap.to(this._decorations, {
        width: baseSize,
        height: baseSize,
        opacity: 0.5,
        borderColor: 'rgba(34, 211, 238, 0.3)',
        duration: 0.4,
        ease: 'power2.inOut',
        stagger: 0.05,
      });

    element.addEventListener('mouseenter', this._mouseEnterHandler);
    element.addEventListener('mouseleave', this._mouseLeaveHandler);
  }
}
