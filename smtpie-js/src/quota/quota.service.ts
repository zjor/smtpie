import { Injectable } from '@nestjs/common';

export class Queue<T> {
  private readonly capacity: number;
  private items: T[] = [];

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  queue(el: T): boolean {
    if (this.size() < this.capacity) {
      this.items.push(el);
      return true;
    } else {
      return false;
    }
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  size(): number {
    return this.items.length;
  }

  peek(): T | undefined {
    if (this.size() > 0) {
      return this.items[0];
    }
  }
}

export class TimeBuffer {
  private readonly period: number;
  private readonly queue: Queue<number>;

  constructor(period: number, capacity: number) {
    this.period = period;
    this.queue = new Queue(capacity);
  }

  add(timestamp: number): boolean {
    while (this.queue.peek() && timestamp - this.queue.peek() > this.period) {
      this.queue.dequeue();
    }
    return this.queue.queue(timestamp);
  }
}

@Injectable()
export class QuotaService {
  private readonly quotas: Map<string, TimeBuffer> = new Map();

  addTenant(id: string, quota: number) {
    this.quotas.set(id, new TimeBuffer(3600, quota));
  }

  checkQuota(id: string, timestamp: number): boolean {
    if (!this.quotas.has(id)) {
      throw new Error(`Unknown tenant: ${id}`);
    }
    return this.quotas.get(id).add(timestamp);
  }
}
