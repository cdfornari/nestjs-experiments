import { UnauthorizedException } from '@nestjs/common';
import {
  ContextId,
  ContextIdFactory,
  ContextIdResolver,
  ContextIdResolverFn,
  ContextIdStrategy,
  HostComponentInfo,
} from '@nestjs/core';

export enum Tenant {
  TESLA = 'tesla',
  MICROSOFT = 'microsoft',
  GOOGLE = 'google',
  AMAZON = 'amazon',
  FACEBOOK = 'facebook',
  APPLE = 'apple',
}

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  private readonly tenants = new Map<string, ContextId>();
  attach(
    contextId: ContextId,
    request: Request,
  ): ContextIdResolverFn | ContextIdResolver {
    const tenantId = request.headers['x-tenant-id'] as string;
    if (!tenantId)
      throw new UnauthorizedException(
        'Tenant ID is not provided in the request',
      );
    //other tenant validation logic
    if (!Object.values(Tenant).includes(tenantId as Tenant))
      throw new UnauthorizedException('Invalid Tenant ID');
    let tenantSubTreeId: ContextId;
    if (this.tenants.has(tenantId)) {
      //use the existing sub tree for the tenant
      tenantSubTreeId = this.tenants.get(tenantId);
    } else {
      //create a new sub tree for the tenant
      tenantSubTreeId = ContextIdFactory.create();
      this.tenants.set(tenantId, tenantSubTreeId);
    }
    // If tree is not durable, return the original "contextId" object
    return {
      payload: { tenantId },
      resolve: (info: HostComponentInfo) =>
        info.isTreeDurable ? tenantSubTreeId : contextId,
    };
  }
}
