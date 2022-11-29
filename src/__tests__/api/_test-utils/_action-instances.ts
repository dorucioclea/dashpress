import { createConfigDomainPersistenceService } from "backend/lib/config-persistence";
import { IActionInstance } from "shared/types/actions";

const TEST_ACTION_INSTANCES: IActionInstance[] = [
  {
    instanceId: "instance-id-1",
    activatedActionId: "activation-id-1",
    integrationKey: "smtp",
    entity: "base-model",
    implementationKey: "SEND_MESSAGE",
    triggerLogic: "some-test-trigger-logic",
    formAction: "create",
    configuration: {
      foo: "bar",
    },
  },
  {
    instanceId: "instance-id-2",
    activatedActionId: "DEFAULT",
    integrationKey: "http",
    entity: "secondary-model",
    implementationKey: "POST",
    triggerLogic: "another-trigger-logic",
    formAction: "delete",
    configuration: {
      bar: "foo",
    },
  },
];

export const setupActionInstanceTestData = async (
  testActionInstances: IActionInstance[] = TEST_ACTION_INSTANCES
) => {
  const configPersistenceService =
    createConfigDomainPersistenceService<IActionInstance>("action_instances");

  await configPersistenceService.resetState("instanceId", testActionInstances);
};
