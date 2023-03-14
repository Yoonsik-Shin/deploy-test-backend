import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardService {
  // aaa() {
  //   return 'Hello World!';
  // }

  findAll() {
    const result = [
      { number: 1, title: 'title1' },
      { number: 2, title: 'title2' },
      { number: 3, title: 'title3' },
    ];

    return result;
  }

  create() {
    return '등록 성공';
  }
}
