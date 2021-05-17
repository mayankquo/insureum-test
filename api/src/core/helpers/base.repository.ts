import { NotFoundException } from '@nestjs/common';
import { AbstractRepository, DeepPartial, FindOneOptions } from 'typeorm';
import { BaseEntity } from './base.entity';

export class BaseRepository<
  T extends BaseEntity
> extends AbstractRepository<T> {
  public save(
    inputs: DeepPartial<T>,
    throwException = true,
  ): Promise<T | null> {
    return this.repository
      .save(inputs)
      .catch((error) => Promise.reject(throwException ? error : null));
  }

  public get(options?: FindOneOptions<T>): Promise<T | null> {
    return this.findOne({ ...options });
  }

  protected findOne(
    options: FindOneOptions<T>,
    throwException = false,
  ): Promise<T | null> {
    return this.repository
      .findOne({ ...options })
      .then((entity) => {
        if (entity) {
          return Promise.resolve(entity);
        }

        if (throwException) {
          return Promise.reject(new NotFoundException('Record not found.'));
        }
      })
      .catch((error) => Promise.reject(error));
  }
}
