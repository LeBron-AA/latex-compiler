int OperatingSystem_LongTermScheduler() {
  
int createdProcessPID, i,
	numberOfSuccessfullyCreatedProcesses=0;

while (OperatingSystem_IsThereANewProgram()!=EMPTYQUEUE) {
  i=Heap_poll(arrivalTimeQueue,QUEUE_ARRIVAL,&numberOfProgramsInArrivalTimeQueue);
  createdProcessPID=OperatingSystem_CreateProcess(i);
  switch (createdProcessPID) {
    case NOFREEENTRY:	// New case (modification)
	   (TIMED_MESSAGE, 51, ERROR, programList[i]->executableName);
	   break;
// Rest of the function...