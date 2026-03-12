import { KeyboardEvent } from 'react';

export const getDocumentTypeId = (documentKey: string): number | null => {
  const mapping: Record<string, number> = {
    idCard: 1,
    criminalRecord: 2,
    managerAct: 3,
    commerceRegister: 4,
    bankStatements: 5,
    communalAttestation: 6,
  };
  return mapping[documentKey] || null;
};

export const onlyNumbers = (e: KeyboardEvent<HTMLInputElement>) => {
  if (
    e.key === 'Backspace' ||
    e.key === 'Delete' ||
    e.key === 'Tab' ||
    e.key === 'ArrowLeft' ||
    e.key === 'ArrowRight' ||
    e.key === 'ArrowUp' ||
    e.key === 'ArrowDown' ||
    e.key === 'Home' ||
    e.key === 'End' ||
    e.key === 'Enter' ||
    /^[0-9]$/.test(e.key)
  ) {
    return;
  }
  
  // Bloquer tout le reste
  e.preventDefault();
};