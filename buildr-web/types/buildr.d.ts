interface SelectOption {
  id: number;
  description: string;
}

declare namespace buildr {
  interface APIResponse {
    status: "ok" | "error";
    data: any;
  }

  interface BattlefieldRole {
    id: number;
    description: string;
  }

  interface Faction {
    id: number;
    description: string;
  }

  interface SubFaction {
    id: number;
    factionId: number;
    description: string;
  }

  interface DataSheet {
    id: number;
    battlefieldRoleId: number;
    subFactionId: number;
    minimumModels: number;
    maximumModels: number;
    description: string;
    points: number;
  }

  interface DataSheetUpgrade {
    id: number;
    datasheetId: number;
    description: string;
    points: number;
  }

  interface User {
    username: string;
    password: string;
  }
  
  interface List {
    units: buildr.List.Unit[];
    factionId: number;
    subFactionId: number;
    points: number;
  }

  interface SubFactionDictionary {
    [factionId: number]: buildr.SubFaction[];
  }
}

declare namespace buildr.List {
  
  interface Unit {
    key: string;
    datasheet: buildr.DataSheet;
    upgrades: buildr.DataSheetUpgrade[];
    models: number;
    points: number;
  }
  
}