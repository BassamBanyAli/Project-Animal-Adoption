import { HttpClientModule } from '@angular/common/http';
import { Component, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { FooterComponent } from './home/footer/footer.component';
import { AbuotComponent } from './home/abuot/abuot.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { AddAnimalCategoryComponent } from './Admin/add-animal-category/add-animal-category.component';
import { GetAllCategoryComponent } from './Admin/get-all-category/get-all-category.component';
import { OurCommunityDetailsComponent } from './ayah/our-community-details/our-community-details.component';
import { ShowAnimalsComponent } from './show-animals/show-animals.component';
import { AddAnimalsComponent } from './Admin/add-animals/add-animals.component';
import { EditAnimalsComponent } from './Admin/edit-animals/edit-animals.component';
import { FormsModule } from '@angular/forms';
import { AddShelterComponent } from './Admin/add-shelter/add-shelter.component';
import { EditShelterComponent } from './Admin/edit-shelter/edit-shelter.component';
import { AnimalsDetailsComponent } from './Duha/./animals-details/animals-details.component';
import { GetAnimalsAdminComponent } from './Admin/get-animals-admin/get-animals-admin.component';
import { BlogComponent } from './Bassam/blog/blog.component';
import { AdoptionFormComponent } from './Duha/adoption-form/adoption-form.component';
import { ProfileComponent } from './home/profile/profile.component';

import { AdoptionApplicationRequestComponent } from './Admin/adoption-application-request/adoption-application-request.component';

import { CreateSucessStoryComponent } from './Bassam/create-sucess-story/create-sucess-story.component';
import { GitShelterComponent } from './Admin/git-shelter/git-shelter.component';
import { GetTestmonialsComponent } from './Admin/get-testmonials/get-testmonials.component';
import { ContactComponent } from './home/contact/contact.component';
import { EditProfileComponent } from './home/edit-profile/edit-profile.component';
import { ShowAllUserComponent } from './Admin/show-all-user/show-all-user.component';
import { UpdateCategoryComponent } from './Admin/update-category/update-category.component';
import { MyAdoptionApplicationComponent } from './home/my-adoption-application/my-adoption-application.component';
import { GetStoriesComponent } from './Admin/get-stories/get-stories.component';
import { AcceptStoryComponent } from './Admin/accept-story/accept-story.component';
import { StoryDetailsComponent } from './Admin/story-details/story-details.component';
import { AdminStatsticsComponent } from './Admin/admin-statstics/admin-statstics.component';
import { ContactUsAdminComponent } from './Admin/ayah/contact-us-admin/contact-us-admin.component';
import { ContactUsFormComponent } from './Admin/ayah/contact-us-form/contact-us-form.component';
import { AdminProfileComponent } from './Admin/admin-profile/admin-profile.component';
import { AnimalsByCategoryComponent } from './home/animals-by-category/animals-by-category.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    FooterComponent,
    AbuotComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddAnimalCategoryComponent,
    GetAllCategoryComponent,
    AddAnimalCategoryComponent,
    OurCommunityDetailsComponent,
    OurCommunityDetailsComponent,
    ShowAnimalsComponent,
    AddAnimalsComponent,
    EditAnimalsComponent,

    AddShelterComponent,
    EditShelterComponent,
    AnimalsDetailsComponent,
    GetAnimalsAdminComponent,
    BlogComponent,
    AdoptionFormComponent,
    ProfileComponent,

    AdoptionApplicationRequestComponent,

    CreateSucessStoryComponent,
    GitShelterComponent,
    GetTestmonialsComponent,
    ContactComponent,
    EditProfileComponent,
    ShowAllUserComponent,
    UpdateCategoryComponent,
    MyAdoptionApplicationComponent,
    

    GetStoriesComponent,
    AcceptStoryComponent,
    StoryDetailsComponent,
            AdminStatsticsComponent,
            ContactUsAdminComponent,
            ContactUsFormComponent,
            AdminProfileComponent,
            AnimalsByCategoryComponent,

    



  ],
  imports: [
    FormsModule,
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
    ,
    RouterModule.forRoot([
      //User
      { path: "", component: HomeComponent, pathMatch: "full" },
      { path: "abuot", component: AbuotComponent },
      { path: "login", component: LoginComponent },
      { path: "register", component: RegisterComponent },
      { path: "OurCommunityDetails/:id", component: OurCommunityDetailsComponent },
      { path: "ShowAnimals", component: ShowAnimalsComponent },
      { path: "AnimalsDetails/:id", component: AnimalsDetailsComponent },
      { path: "AdoptionForm", component: AdoptionFormComponent },
      { path: "profile" , component:ProfileComponent},
      { path: "AdoptionForm/:id", component: AdoptionFormComponent },
      { path: "contact", component:ContactComponent},
      { path: 'editprofile/:id', component: EditProfileComponent },
      { path: "app-blog", component: BlogComponent },
      { path: "app-create-sucess-story", component: CreateSucessStoryComponent },
      { path: "myApplication", component: MyAdoptionApplicationComponent },
      { path: "animals/:categoryId", component: AnimalsByCategoryComponent },

      //AdminDashboard
      {
        path: "dashboard",
        component: DashboardComponent,
        children: [
          { path: "getAllCategory", component: GetAllCategoryComponent },
          { path: "addAnimalCategory", component: AddAnimalCategoryComponent },
          { path: "getAnimalsAdmin", component: GetAnimalsAdminComponent},
          { path: "EditAnimals/:id", component: EditAnimalsComponent },
          { path: "addAnimal", component: AddAnimalsComponent },

          { path: "ShowAdoptionRequest", component: AdoptionApplicationRequestComponent },

          { path: "GitShelter", component: GitShelterComponent },
          { path: "AddShelter", component: AddShelterComponent },
          { path: "getStories", component: GetStoriesComponent },

          { path: "updatecategory/:id", component: UpdateCategoryComponent },
          { path: "AddShelter", component: AddShelterComponent},
          { path: "EditShelter/:id", component: EditShelterComponent },
          { path: "showwTestmoinals", component: GetTestmonialsComponent },
          { path: "showAllUser", component: ShowAllUserComponent },
          { path: "updatecategory/:id", component: UpdateCategoryComponent },
          { path: "accept-story", component: AcceptStoryComponent },
          { path: "storyDetails/:id", component:StoryDetailsComponent },
          { path: "adminStatistic", component: AdminStatsticsComponent },
          { path: "contactUs", component: ContactUsAdminComponent },
          { path: "contactUsForm/:id", component: ContactUsFormComponent },
          { path: "adminProfile" , component:AdminProfileComponent},


        ]

      },




    ])
  ],
  providers: [],
  bootstrap: [AppComponent],


})
export class AppModule { }
