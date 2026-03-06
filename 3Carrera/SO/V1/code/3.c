void ComputerSystem_PowerOn(int argc, char *argv[], int paramIndex) {
	ComputerSystem_DebugMessage(TIMED_MESSAGE, 99, POWERON, "STARTING simulation\n");
	
	// Obtain a list of programs in the command line
	int programsFromFilesBaseIndex = ComputerSystem_ObtainProgramList(argc, argv, paramIndex);
	ComputerSystem_PrintProgramList(argc);
//...Rest of the funcition...