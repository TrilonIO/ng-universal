import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { join } from 'path';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      viewsPath: join(process.cwd(), 'dist/browser'),
      bundle: require(join(
        process.cwd(),
        'dist/server/main'
      )),
      liveReload: true
    })
  ]
})
export class ApplicationModule {}
