import {ProfileInfoComponent} from "./profile-info.component";
import {UserService} from "../../user.service";

describe("ProfileInfoComponent", () => {
  let component: ProfileInfoComponent;
  let userService: UserService;

  beforeEach(async () => {
    userService = jasmine.createSpyObj<UserService>(["currentUser"]);
    component = new ProfileInfoComponent(userService);
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
