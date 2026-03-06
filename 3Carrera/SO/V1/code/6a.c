int OperatingSystem_CreateProcess(int indexOfExecutableProgram) { 
  int assignedPID;
  int processSize;
  int loadingPhysicalAddress;
  int priority;
  FILE *programFile;
  PROGRAMS_DATA *executableProgram=programList[indexOfExecutableProgram];

  // Obtain a process ID
  assignedPID=OperatingSystem_ObtainAnEntryInTheProcessTable();
  if(assignedPID == NOFREEENTRY) return NOFREEENTRY; // Early return if needed
//... [Rest of the code]