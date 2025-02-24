import { Formation } from '../models/formation.interface';


export const FORMATIONS: Formation[] = [
  {
    id: '433',
    name: '4-3-3',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Midfielders
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'ccm', name: 'Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      // Forwards
      { id: 'lw', name: 'Left Wing', shortName: 'LW' },
      { id: 'st', name: 'Striker', shortName: 'ST' },
      { id: 'rw', name: 'Right Wing', shortName: 'RW' }
    ]
  },
  {
    id: '442',
    name: '4-4-2',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Midfielders
      { id: 'lm', name: 'Left Midfielder', shortName: 'LM' },
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      { id: 'rm', name: 'Right Midfielder', shortName: 'RM' },
      // Forwards
      { id: 'ls', name: 'Left Striker', shortName: 'ST' },
      { id: 'rs', name: 'Right Striker', shortName: 'ST' }
    ]
  },
  {
    id: '4231',
    name: '4-2-3-1',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Defensive Midfielders
      { id: 'ldm', name: 'Left Defensive Midfielder', shortName: 'DM' },
      { id: 'rdm', name: 'Right Defensive Midfielder', shortName: 'DM' },
      // Attacking Midfielders
      { id: 'lam', name: 'Left Attacking Midfielder', shortName: 'AM' },
      { id: 'cam', name: 'Center Attacking Midfielder', shortName: 'CAM' },
      { id: 'ram', name: 'Right Attacking Midfielder', shortName: 'AM' },
      // Forward
      { id: 'st', name: 'Striker', shortName: 'ST' }
    ]
  },
  {
    id: '4312',
    name: '4-3-1-2',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Defensive Midfielders
      { id: 'ldm', name: 'Left Defensive Midfielder', shortName: 'DM' },
      { id: 'cdm', name: 'Center Defensive Midfielder', shortName: 'DM' },
      { id: 'rdm', name: 'Right Defensive Midfielder', shortName: 'DM' },
      // Attacking Midfielder
      { id: 'cam', name: 'Center Attacking Midfielder', shortName: 'CAM' },
      // Forwards
      { id: 'ls', name: 'Left Striker', shortName: 'ST' },
      { id: 'rs', name: 'Right Striker', shortName: 'ST' }
    ]
  },
  {
    id: '4141',
    name: '4-1-4-1',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Defensive Midfielder
      { id: 'cdm', name: 'Center Defensive Midfielder', shortName: 'DM' },
      // Attacking Midfielders
      { id: 'lam', name: 'Left Attacking Midfielder', shortName: 'AM' },
      { id: 'lcam', name: 'Left Center Attacking Midfielder', shortName: 'AM' },
      { id: 'rcam', name: 'Right Center Attacking Midfielder', shortName: 'AM' },
      { id: 'ram', name: 'Right Attacking Midfielder', shortName: 'AM' },
      // Forward
      { id: 'st', name: 'Striker', shortName: 'ST' }
    ]
  },
  {
    id: '4411',
    name: '4-4-1-1',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Midfielders
      { id: 'lm', name: 'Left Midfielder', shortName: 'LM' },
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      { id: 'rm', name: 'Right Midfielder', shortName: 'RM' },
      // Attacking Midfielder
      { id: 'cam', name: 'Center Attacking Midfielder', shortName: 'CAM' },
      // Forward
      { id: 'st', name: 'Striker', shortName: 'ST' }
    ]
  },
  {
    id: '4321',
    name: '4-3-2-1',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lb', name: 'Left Back', shortName: 'LB' },
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      { id: 'rb', name: 'Right Back', shortName: 'RB' },
      // Midfielders
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'ccm', name: 'Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      // Attacking Midfielders
      { id: 'lam', name: 'Left Attacking Midfielder', shortName: 'AM' },
      { id: 'ram', name: 'Right Attacking Midfielder', shortName: 'AM' },
      // Forward
      { id: 'st', name: 'Striker', shortName: 'ST' }
    ]
  },
  {
    id: '343',
    name: '3-4-3',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'cb', name: 'Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      // Midfielders
      { id: 'lm', name: 'Left Midfielder', shortName: 'LM' },
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      { id: 'rm', name: 'Right Midfielder', shortName: 'RM' },
      // Forwards
      { id: 'lw', name: 'Left Wing', shortName: 'LW' },
      { id: 'st', name: 'Striker', shortName: 'ST' },
      { id: 'rw', name: 'Right Wing', shortName: 'RW' }
    ]
  },
  {
    id: '3412',
    name: '3-4-1-2',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'cb', name: 'Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      // Midfielders
      { id: 'lm', name: 'Left Midfielder', shortName: 'LM' },
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      { id: 'rm', name: 'Right Midfielder', shortName: 'RM' },
      // Attacking Midfielder
      { id: 'cam', name: 'Center Attacking Midfielder', shortName: 'CAM' },
      // Forwards
      { id: 'ls', name: 'Left Striker', shortName: 'ST' },
      { id: 'rs', name: 'Right Striker', shortName: 'ST' }
    ]
  },
  {
    id: '3421',
    name: '3-4-2-1',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'cb', name: 'Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      // Midfielders
      { id: 'lm', name: 'Left Midfielder', shortName: 'LM' },
      { id: 'lcm', name: 'Left Center Midfielder', shortName: 'CM' },
      { id: 'rcm', name: 'Right Center Midfielder', shortName: 'CM' },
      { id: 'rm', name: 'Right Midfielder', shortName: 'RM' },
      // Attacking Midfielders
      { id: 'lam', name: 'Left Attacking Midfielder', shortName: 'AM' },
      { id: 'ram', name: 'Right Attacking Midfielder', shortName: 'AM' },
      // Forward
      { id: 'st', name: 'Striker', shortName: 'ST' }
    ]
  },
  {
    id: '3241',
    name: '3-2-4-1',
    positions: [
      { id: 'gk', name: 'Goalkeeper', shortName: 'GK' },
      // Defenders
      { id: 'lcb', name: 'Left Center Back', shortName: 'CB' },
      { id: 'cb', name: 'Center Back', shortName: 'CB' },
      { id: 'rcb', name: 'Right Center Back', shortName: 'CB' },
      // Defensive Midfielders
      { id: 'ldm', name: 'Left Defensive Midfielder', shortName: 'DM' },
      { id: 'rdm', name: 'Right Defensive Midfielder', shortName: 'DM' },
      // Attacking Midfielders
      { id: 'lam', name: 'Left Attacking Midfielder', shortName: 'AM' },
      { id: 'lcam', name: 'Left Center Attacking Midfielder', shortName: 'AM' },
      { id: 'rcam', name: 'Right Center Attacking Midfielder', shortName: 'AM' },
      { id: 'ram', name: 'Right Attacking Midfielder', shortName: 'AM' },
      // Forward
      { id: 'st', name: 'Striker', shortName: 'ST' }
    ]
  }
]; 