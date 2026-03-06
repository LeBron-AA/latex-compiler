int OperatingSystem_LongTermScheduler() {
  //..[code gap]...
  // Process creation has succeeded: additional actions
  // Show message "Process [createdProcessPID] created from program [executableName]\n"
  ComputerSystem_DebugMessage(TIMED_MESSAGE,70,SYSPROC,
    createdProcessPID,programList[i]->executableName);
  numberOfSuccessfullyCreatedProcesses++;
  if (programList[i]->type==USERPROGRAM) 
    numberOfNotTerminatedUserProcesses++;
  // Move process to the ready state
  OperatingSystem_MoveToTheREADYState(createdProcessPID);
//..Rest of the function...
}

void OperatingSystem_MoveToTheREADYState(int PID) {	
  int processQueueID = processTable[PID].queueID;
  if (Heap_add(PID, readyToRunQueue[processQueueID],QUEUE_PRIORITY,
        &(numberOfReadyToRunProcesses[processQueueID]))>=0) {
            
    processTable[PID].state=READY; // possible segmentation fault
  } 
}