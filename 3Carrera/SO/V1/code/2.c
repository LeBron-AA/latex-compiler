void ComputerSystem_PrintProgramList(int argc) {
	ComputerSystem_DebugMessage(TIMED_MESSAGE, 101,INIT);
	for(int i=1; i <= argc && programList[i] != NULL; i++) {
		ComputerSystem_DebugMessage(NO_TIMED_MESSAGE, 102, INIT, programList[i]->executableName, programList[i]->arrivalTime);
	}
}