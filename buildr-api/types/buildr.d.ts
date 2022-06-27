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
    subFactionIds: number[];
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
}