import { Controller, Get, Header, Param, Query, StreamableFile, UseGuards } from "@nestjs/common";
import { AdminAuthGuard } from "./admin-auth.guard";
import { AdminService } from "./admin.service";

@Controller("admin")
@UseGuards(AdminAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(":dataset/export")
  async exportDataset(
    @Param("dataset") dataset: string,
    @Query("format") format?: string,
  ): Promise<StreamableFile> {
    const file = await this.adminService.exportFile(dataset, format);
    return new StreamableFile(file.body, {
      type: file.contentType,
      disposition: `attachment; filename="${file.filename}"`,
    });
  }

  @Get(":dataset")
  @Header("Cache-Control", "no-store")
  list(
    @Param("dataset") dataset: string,
    @Query("page") page?: string,
    @Query("pageSize") pageSize?: string,
  ) {
    return this.adminService.list(dataset, parseInt(page ?? "1", 10), parseInt(pageSize ?? "25", 10));
  }
}
