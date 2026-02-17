import { ChangeDetectionStrategy, Component, input, computed, inject, OnInit } from '@angular/core';
import { PaginationService } from './services/pagination.service';
import { PaginationKeys } from '@models/pagination';
import { TechBorderDirective } from '@directives/tech-border.directive';
import { CornerStyle } from '@directives/models/tech.border';

@Component({
  selector: 'pet-pagination',
  standalone: true,
  imports: [TechBorderDirective],
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination implements OnInit {
  private _paginationService = inject(PaginationService);

  public key = input.required<PaginationKeys>();

  public limitOptions = [5, 10, 25, 50];
  public CornerStyle = CornerStyle;

  private _paginationConfig = computed(() =>
    this._paginationService.getPaginationConfig(this.key()),
  );
  public page = computed(() => this._paginationConfig().pagination().page);
  public limit = computed(() => this._paginationConfig().pagination().limit);
  public totalPages = computed(() => this._paginationConfig().response().totalPages);

  public ngOnInit(): void {
    this._paginationService.setPageNum(this.key(), 1);
    this._paginationService.setPageLimit(this.key(), 10);
  }

  public prev() {
    if (this.page() > 1) {
      this._paginationService.setPageNum(this.key(), this.page() - 1);
    }
  }

  public next() {
    if (this.page() < this.totalPages()) {
      this._paginationService.setPageNum(this.key(), this.page() + 1);
    }
  }

  public changeLimit(event: Event) {
    const value = Number((event.target as HTMLSelectElement).value);
    this._paginationService.setPageLimit(this.key(), value);
    this._paginationService.setPageNum(this.key(), 1);
  }
}
