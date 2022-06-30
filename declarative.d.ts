export interface DeclarativeSchema {
  $schema?: string;
  version: 1;
  projects: Project[];
}
export interface Project {
  name: string;
  key: string;
  description?: string | null;
  tags?: string[] | null;
  feature_flags: FeatureFlag[];
  [k: string]: unknown;
}
export interface FeatureFlag {
  key: string;
  name: string;
  description?: string | null;
  tags?: string[] | null;
  variations: {
    [k: number]: LabeledFlag;
  };
  is_frontend: boolean;
  environments: Environments;
}
/**
 * This interface was referenced by `undefined`'s JSON-Schema definition
 * via the `patternProperty` "^[0-9]+$".
 */
export interface LabeledFlag {
  label: string;
  flag: Flag;
}
export interface Flag {
  BooleanFlag?: boolean;
  JsonFlag?: JSONFlag;
}
export interface JSONFlag {
  [k: string]: unknown;
}
export interface Environments {
  [k: string]: Environment;
}
export interface Environment {
  enabled: boolean;
  targeting?: Targeting[] | null;
  enabled_default_variation: number;
  disabled_variation: number;
}
export interface Targeting {
  name: string;
  formula: Formula;
  variation: number;
  starts_at: string;
  expires_at: string;
}
export interface Formula {
  Pure?: TargetingStrategy;
  And?: [Formula, Formula];
  Or?: [Formula, Formula];
  Negate?: Formula;
}
export interface TargetingStrategy {
  MetadataPredicate?: MetadataPredicate;
  UserId?: UserID;
  Percentage?: Percentage;
}
export interface MetadataPredicate {
  attribute: string;
  operator: "StartsWith" | "EndsWith" | "Equals" | "Contains" | "Matches";
  value: string;
}
export interface UserID {
  user_ids: string[];
}
export interface Percentage {
  percentage: number;
}
