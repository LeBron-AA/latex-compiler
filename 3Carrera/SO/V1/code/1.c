void Processor_DecodeAndExecuteInstruction() {
//... [code gap]
switch (operationCode) {
case MEMADD_INST:
    registerMAR_CPU=operand1; // set address
    Buses_write_AddressBus_From_To(CPU, MMU);
    registerCTRL_CPU=CTRLREAD; // read
    Buses_write_ControlBus_From_To(CPU,MMU);
    switch (operand2) {
        case REGISTERACCUMULATOR_CPU:
            tempAcc = registerAccumulator_CPU;
            registerAccumulator_CPU+=registerMBR_CPU.cell;
            break;
        case REGISTERA_CPU:
            tempAcc = registerA_CPU;
            registerA_CPU+=registerMBR_CPU.cell;
            break;
        case REGISTERB_CPU:
            tempAcc = registerB_CPU;
            registerB_CPU+=registerMBR_CPU.cell;
            break;
        default:
            //Accumulator as default registry
            operand2 = REGISTERACCUMULATOR_CPU;
            tempAcc = registerAccumulator_CPU;
            registerAccumulator_CPU+=registerMBR_CPU.cell;
    }
    Processor_CheckOverflow(operand1,registerMBR_CPU.cell,operand2);
    registerPC_CPU++;
    break;
//Rest of the funcion...