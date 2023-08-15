/**
 * The upstream fhir-js package doesn't correctly export types for node. And it uses STU3 types.
 *
 * This is mostly copy/paste of the types from the package with light modification. Updated to use FHIR4 types.
 */
/// <reference types="@types/fhir" />

export = fhirClient;

declare function fhirClient(cfg: any): fhirClient.FhirClient;

declare namespace fhirClient {
  export type ClientFn = (...args: any[]) => Promise<{ data: any }>;
  export type ResourceName =
    | "Account"
    | "ActivityDefinition"
    | "AdverseEvent"
    | "AllergyIntolerance"
    | "Appointment"
    | "AppointmentResponse"
    | "AuditEvent"
    | "Basic"
    | "Binary"
    | "BiologicallyDerivedProduct"
    | "BodyStructure"
    | "Bundle"
    | "CapabilityStatement"
    | "CarePlan"
    | "CareTeam"
    | "CatalogEntry"
    | "ChargeItem"
    | "ChargeItemDefinition"
    | "Claim"
    | "ClaimResponse"
    | "ClinicalImpression"
    | "CodeSystem"
    | "Communication"
    | "CommunicationRequest"
    | "CompartmentDefinition"
    | "Composition"
    | "ConceptMap"
    | "Condition"
    | "Consent"
    | "Contract"
    | "Coverage"
    | "CoverageEligibilityRequest"
    | "CoverageEligibilityResponse"
    | "DetectedIssue"
    | "Device"
    | "DeviceDefinition"
    | "DeviceMetric"
    | "DeviceRequest"
    | "DeviceUseStatement"
    | "DiagnosticReport"
    | "DocumentManifest"
    | "DocumentReference"
    | "EffectEvidenceSynthesis"
    | "Encounter"
    | "Endpoint"
    | "EnrollmentRequest"
    | "EnrollmentResponse"
    | "EpisodeOfCare"
    | "EventDefinition"
    | "Evidence"
    | "EvidenceVariable"
    | "ExampleScenario"
    | "ExplanationOfBenefit"
    | "FamilyMemberHistory"
    | "Flag"
    | "Goal"
    | "GraphDefinition"
    | "Group"
    | "GuidanceResponse"
    | "HealthcareService"
    | "ImagingStudy"
    | "Immunization"
    | "ImmunizationEvaluation"
    | "ImmunizationRecommendation"
    | "ImplementationGuide"
    | "InsurancePlan"
    | "Invoice"
    | "Library"
    | "Linkage"
    | "List"
    | "Location"
    | "Measure"
    | "MeasureReport"
    | "Media"
    | "Medication"
    | "MedicationAdministration"
    | "MedicationDispense"
    | "MedicationKnowledge"
    | "MedicationRequest"
    | "MedicationStatement"
    | "MedicinalProduct"
    | "MedicinalProductAuthorization"
    | "MedicinalProductContraindication"
    | "MedicinalProductIndication"
    | "MedicinalProductIngredient"
    | "MedicinalProductInteraction"
    | "MedicinalProductManufactured"
    | "MedicinalProductPackaged"
    | "MedicinalProductPharmaceutical"
    | "MedicinalProductUndesirableEffect"
    | "MessageDefinition"
    | "MessageHeader"
    | "MolecularSequence"
    | "NamingSystem"
    | "NutritionOrder"
    | "Observation"
    | "ObservationDefinition"
    | "OperationDefinition"
    | "OperationOutcome"
    | "Organization"
    | "OrganizationAffiliation"
    | "Parameters"
    | "Patient"
    | "PaymentNotice"
    | "PaymentReconciliation"
    | "Person"
    | "PlanDefinition"
    | "Practitioner"
    | "PractitionerRole"
    | "Procedure"
    | "Provenance"
    | "Questionnaire"
    | "QuestionnaireResponse"
    | "RelatedPerson"
    | "RequestGroup"
    | "ResearchDefinition"
    | "ResearchElementDefinition"
    | "ResearchStudy"
    | "ResearchSubject"
    | "RiskAssessment"
    | "RiskEvidenceSynthesis"
    | "Schedule"
    | "SearchParameter"
    | "ServiceRequest"
    | "Slot"
    | "Specimen"
    | "SpecimenDefinition"
    | "StructureDefinition"
    | "StructureMap"
    | "Subscription"
    | "Substance"
    | "SubstanceNucleicAcid"
    | "SubstancePolymer"
    | "SubstanceProtein"
    | "SubstanceReferenceInformation"
    | "SubstanceSourceMaterial"
    | "SubstanceSpecification"
    | "SupplyDelivery"
    | "SupplyRequest"
    | "Task"
    | "TerminologyCapabilities"
    | "TestReport"
    | "TestScript"
    | "ValueSet"
    | "VerificationResult"
    | "VisionPrescription";

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
