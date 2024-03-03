import {
  ArgumentMetadata,
  Inject,
  Injectable,
  NotFoundException,
  PipeTransform,
  Type,
} from '@nestjs/common';

export function EntityExistsPipe(entityCls: Type): Type<PipeTransform> {
  @Injectable()
  class EntityExistsPipeCls implements PipeTransform {
    constructor(
      @Inject(entityCls)
      private entityRepository: {
        findById: (id: any) => Promise<typeof entityCls>;
      },
    ) {}

    async transform(value: any, metadata: ArgumentMetadata) {
      const entity = await this.entityRepository.findById(value);
      if (!entity) throw new NotFoundException(`${entityCls.name} not found`);
      return entity;
    }
  }
  return EntityExistsPipeCls;
}
