import { Component } from '@angular/core';
import { PostService } from './services/post/post.service';
import { AppError } from './errors/app-error';
import { NotFoundError } from './errors/not-found-error';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Layout';

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.get().subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
