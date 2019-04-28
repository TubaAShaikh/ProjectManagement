
import { trigger,transition,style,animate } from '@angular/animations'

export let fade = trigger('fade',[
    transition('void => *', [
        style({ opacity: 0 }),
        animate('3000ms')
    ])
])

export let slide = trigger('slideInOut',[
    transition('void => *',[
        style({ transform: 'translateY(20px)'}),
        animate('800ms')
    ]),
    transition('* => void',[
        animate('800ms ease-out',style({transform:'translateX(-100%)'}))
    ])
])