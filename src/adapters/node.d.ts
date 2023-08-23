/**
 * The upstream fhir-js package doesn't correctly export types for node. And it uses STU3 types.
 *
 * This is mostly copy/paste of the types from the package with light modification. Updated to use FHIR4 types.
 */
/// <reference types="@types/fhir" />

export = fhirClient;

declare function fhirClient(cfg: any, handleNotOkResponse?: (response: any)=> any): fhirClient.FhirClient;

declare namespace fhirClient {
  export type ClientFn = (...args: any[]) => Promise<{ data: any }>;
  export type ResourceName = fhir4.FhirResource['resourceType'];

  export interface QueryOptions {
    $include?: { [key: string]: string | string[] };
    [key: string]: any;
  }
  function Create<T extends fhir4.DomainResource>(content: {
    resource: T;
  }): Promise<{ data: T }>;

  function Create(content: {
    type: "Binary";
    data: Buffer;
  }): Promise<{ data: fhir4.Binary }>;

  function Create<T extends fhir4.DomainResource>(content: {
    type: T["resourceType"];
    data: T;
  }): Promise<{ data: T }>;

  function Read<T extends fhir4.DomainResource>(content: {
    type: T["resourceType"];
    id: string;
  }): Promise<{ data: T }>;

  function GetResourceSubPath<T extends fhir4.DomainResource>(content: {
    type: T["resourceType"];
    id: string;
    subPath: string;
  }): Promise<{ data: Record<string, any> }>;

  function Patch(content: {
    type: ResourceName;
    id: string;
    data: Array<{
      op: "replace" | "add" | "remove";
      path: string;
      value: string | object;
    }>;
  }): Promise<{ data: fhir4.OperationOutcome }>;

  function Update<T extends fhir4.DomainResource>(content: {
    resource: T;
  }): Promise<{ data: T }>;

  function Search<T extends fhir4.DomainResource>(content: {
    type: T["resourceType"];
    count?: number;
    query?: QueryOptions;
  }): Promise<{ data: fhir4.Bundle<T> }>;

  function NextPage<T extends fhir4.DomainResource>(content: {
    type: T["resourceType"];
    bundle: fhir4.Bundle<T>;
  }): Promise<{ data: fhir4.Bundle<T> }>;

  export interface FhirClient {
    conformance: ClientFn;
    document: ClientFn;
    profile: ClientFn;
    transaction: ClientFn;
    history: ClientFn;
    typeHistory: ClientFn;
    resourceHistory: ClientFn;
    read: typeof Read;
    getResourceSubPath: typeof GetResourceSubPath;
    vread: ClientFn;
    delete: ClientFn;
    create: typeof Create;
    validate: ClientFn;
    search: typeof Search;
    update: typeof Update;
    nextPage: typeof NextPage;
    prevPage: ClientFn;
    resolve: ClientFn;
    patch: typeof Patch;
  }
}
