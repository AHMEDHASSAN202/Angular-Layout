import { Component } from '@angular/core';
import { PostService } from './services/post/post.service';

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
    // this.postService.delete({id: 5898945}).subscribe(d => console.log(d));
  }

}
