import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class Statistics {
  @ApiProperty()
  successCount: number;
  @ApiProperty()
  failureCount: number;

  constructor(s: number, f: number) {
    this.successCount = s;
    this.failureCount = f;
  }
}

@Injectable()
export class StatsService {
  readonly storage: Map<string, Statistics> = new Map();

  incSuccess(key: string): void {
    if (!this.storage.has(key)) {
      this.storage.set(key, new Statistics(0, 0));
    }
    this.storage.get(key).successCount++;
  }

  incFailure(key: string): void {
    if (!this.storage.has(key)) {
      this.storage.set(key, new Statistics(0, 0));
    }
    this.storage.get(key).failureCount++;
  }
}
