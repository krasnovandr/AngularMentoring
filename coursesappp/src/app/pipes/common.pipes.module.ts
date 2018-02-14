import { CommonModule } from '@angular/common';
import { DurationPipe } from './duration.pipe';
import { OrderbyPipe } from './orderby.pipe';
import { FilterPipe } from './filter.pipe';
import { NgModule } from '@angular/core';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        FilterPipe,
        DurationPipe,
        OrderbyPipe
    ],
    exports: [
        DurationPipe,
        FilterPipe,
        OrderbyPipe
    ]
})
export class CommonPipesModule { }
