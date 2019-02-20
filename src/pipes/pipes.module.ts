import { NgModule } from '@angular/core';
import { IsCurrentUserPipe } from './is-current-user/is-current-user';
import { BuildUrlPipe } from './build-url/build-url';
import { ColorFirstLetterPipe } from './color-first-letter/color-first-letter';
import { NumberFormatBrPipe } from './number-format-br/number-format-br';

@NgModule({
	declarations: [IsCurrentUserPipe,
        BuildUrlPipe,
        ColorFirstLetterPipe,
        NumberFormatBrPipe

    ],
	imports: [],
	exports: [IsCurrentUserPipe,
        BuildUrlPipe,
        ColorFirstLetterPipe,
        NumberFormatBrPipe
    ],
    providers: [
        IsCurrentUserPipe
    ]
})
export class PipesModule {}
