import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  async upload({ files }) {
    // const waitedFiles = await Promise.all(files);
    // console.log(waitedFiles);
    // const storage = new Storage({
    //   projectId: '프로젝트아이디',
    //   keyFilename: '키파일이름',
    // }).bucket('폴더명');
    // const results = await Promise.all(
    //   waitedFiles.map((el) => {
    //     return new Promise((resolve, reject) => {
    //       el.createReadStream()
    //         .pipe(storage.file(el.filename).createWriteStream())
    //         .on('finish', () => resolve('성공'))
    //         .on('error', () => reject('실패'));
    //     });
    //   }),
    // );
    // return results;
  }
}
