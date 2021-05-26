import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
    @Get()
    gome() {
        return "Welcom to my Movie API";
    }
}
