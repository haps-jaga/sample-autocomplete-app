class EmployeesController < ApplicationController

  before_action :set_search_key, only: [:search]

  # GET /employees/search
  def search
    @employees = Employee.where("name like ?", "%#{@search_key}%").paginate(page: params[:page], per_page: 20)
    json_response(@employees)
  end

  # POST /employees
  def create
    @employee = Employee.create!(employee_params)
    json_response(@todo, :created)
  end

  private
  def set_search_key
    @search_key = params[:name].to_s
  end

  def employee_params
    params.permit(:name, :email)
  end

end
