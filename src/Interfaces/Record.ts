export enum ERecordType {
  follow = 'app.bsky.graph.follow',
  post = 'app.bsky.feed.post',
  like = 'app.bsky.feed.like',
  quote = 'app.bsky.graph.quote',
}

export interface Record {
  $type: ERecordType;
  createdAt: string;
  facets: any[];
  langs: string[];
  text: string;
  via: string;
  subject: Subject;
}

export interface Subject {
  cid: string;
  uri: string;
}
