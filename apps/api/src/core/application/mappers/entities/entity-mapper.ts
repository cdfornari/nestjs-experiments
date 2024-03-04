import { Entity } from 'src/core/domain';

export interface EntityMapper<D extends Entity<any>, P> {
  fromDomainToPersistence(entity: D): P;
  fromPersistenceToDomain(persistenceEntity: P): D;
}
