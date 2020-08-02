Rails.application.routes.draw do
  resources :employees, only: [:create] do
    collection do
      get :search
    end
  end
end